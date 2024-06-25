import subprocess
import time
import os

# Function to run a command in a new process


def run_command(command, cwd=None):
    return subprocess.Popen(command, cwd=cwd, shell=True)


# Paths to the project directories
project_root = os.path.dirname(os.path.abspath(__file__))
vite_project_path = os.path.join(project_root, 'websocket-client')
server_js_path = os.path.join(project_root, 'nodeJs/app.js')
# Replace with your Python app script
python_app_path = os.path.join(project_root, 'py-ws/app.py')

try:
    # Start the WebSocket server
    ws_server = run_command(['node', server_js_path])
    time.sleep(2)  # Give the server some time to start

    # Start the Vite development server
    vite_server = run_command(['npm', 'run', 'dev'], cwd=vite_project_path)
    time.sleep(2)  # Give Vite some time to start

    # Start the Python script
    python_script = run_command(['python', python_app_path])

    # Wait for the processes to complete (this will run indefinitely)
    ws_server.wait()
    vite_server.wait()
    python_script.wait()
except KeyboardInterrupt:
    # Terminate all processes if the script is interrupted
    ws_server.terminate()
    vite_server.terminate()
    python_script.terminate()
    print("Processes terminated.")
