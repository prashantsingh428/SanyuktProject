// Global array that retains references, preventing garbage collection
let leakStorage = [];

// @desc  Check current memory usage
// @route GET /api/debug/memory
// @access Public (for debug/interview demonstration)
exports.getMemoryUsage = (req, res) => {
    const memory = process.memoryUsage();
    
    // Convert to MB for readability
    const formatMemory = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

    res.json({
        rss: formatMemory(memory.rss), // Resident Set Size: Total memory allocated for the process
        heapTotal: formatMemory(memory.heapTotal), // V8's memory usage
        heapUsed: formatMemory(memory.heapUsed), // V8's memory actually being used
        external: formatMemory(memory.external), // Memory bound to V8 but managed by C++ (e.g. buffers)
        arrayLength: leakStorage.length // How many items we've leaked
    });
};

// @desc  Simulate a memory leak by appending large objects to a global array
// @route GET /api/debug/leak
// @access Public (for debug/interview demonstration)
exports.triggerLeak = (req, res) => {
    // We create a string of ~1MB
    const heavyString = new Array(1024 * 1024).join('x'); 
    
    // We push 10 of these (10MB total) into the global array per request
    for (let i = 0; i < 10; i++) {
        leakStorage.push({
            id: Date.now() + i,
            data: heavyString,
            metadata: "This object will never be garbage collected until clear is called"
        });
    }

    res.json({
        success: true,
        message: "Memory leak triggered! Appended ~10MB of data to global storage.",
        currentLeakSize: leakStorage.length
    });
};

// @desc  Clear the memory leak and allow garbage collection
// @route GET /api/debug/clear-leak
// @access Public
exports.clearLeak = (req, res) => {
    // Clearing the array removes the strong references
    leakStorage = [];
    
    // Optional: We can force GC if Node is run with --expose-gc, otherwise it runs automatically later
    if (global.gc) {
        global.gc();
    }

    res.json({
        success: true,
        message: "Memory leak cleared! Garbage collector can now reclaim the memory.",
        currentLeakSize: leakStorage.length
    });
};
