# 📚 Fall-Insurance Development Workflow Guide

* [← Back to Main Guide](../../../tree/main/docs/Getting_Started.md)

This technical guide covers the standard daily workflow for spinning up the local container infrastructure, launching the Next.js frontend development server, and cleanly shutting down the environment.

---

## 1. Environment Startup & Backend Services
First of all, you need to spin up the containerized backend services and identity provider using the automation script in the project root.

* Open a terminal, navigate to the project root directory, and run the startup script:
```bash
cd ~/Projects/fall-insurance
./startup.sh

```

---

## 2. Frontend Development Server

Next, launch the frontend application to test the user interface and authentication flows. This process requires moving into the frontend directory and starting the local development server.

* Navigate into the frontend directory and run the development command:

```bash
cd fall-insurance-frontend
npm run dev

```

* Once running, open your browser and access the application dashboard at `http://localhost:3000`.

| Step 1: Navigate & Start | Step 2: Running Environment |
| --- | --- |
|  |  |

---

## 3. Stopping Services & Teardown

Finally, safely terminate the development server and tear down the background containers when your work session is complete.

* Stop the running frontend development server by pressing `Ctrl + C` in your active terminal.
* Return to the project root directory and execute the down script to remove all Docker containers cleanly:

```bash
cd ~/Projects/fall-insurance
./down.sh

```

---

