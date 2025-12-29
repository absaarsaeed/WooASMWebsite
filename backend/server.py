"""
Wrapper to start Node.js backend from Python uvicorn
This file exists because the supervisor config is read-only
"""
import subprocess
import sys
import os
import signal

# Start Node.js server
process = None

def signal_handler(sig, frame):
    global process
    if process:
        process.terminate()
    sys.exit(0)

signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)

if __name__ == "__main__":
    os.chdir('/app/backend')
    process = subprocess.Popen(['node', 'src/server.js'])
    process.wait()
