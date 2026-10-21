# Experiment: Demonstrate Malicious Program Detection Using Virus Signature and Behavioral Analysis

A modular, lightweight educational experiment developed for a college-level **Computer Engineering Virtual Laboratory**.

---

## 1. Experiment Title
**Demonstrate Malicious Program Detection Using Virus Signature and Behavioral Analysis**

---

## 2. Aim
To demonstrate the principles and methodologies of detecting potentially malicious computer software using two fundamental paradigms:
1. **Virus Signature Analysis** (static pattern and cryptographic hash matching).
2. **Behavioral Analysis** (dynamic runtime indicator assessment and risk scoring).

---

## 3. Objectives
* Understand the concept of static virus signatures and byte sequence identification.
* Analyze common runtime behavioral indicators exhibited by malware (process spawning, unauthorized file encryption, startup persistence, command-and-control communication, and security policy tampering).
* Perform simulated signature scans against a structured threat repository.
* Perform simulated dynamic behavioral analysis and calculate weighted risk levels.
* Synthesize findings into a combined detection verdict (Clean, Suspicious, or Malicious).
* Demonstrate why behavioral analysis is indispensable when detecting zero-day and polymorphic threats that evade static signatures.

---

## 4. Technologies Used
* **HTML5:** Clean, semantic structure with accessible form controls and ARIA attributes.
* **CSS3:** Native styling with customizable CSS variables (`:root`) for instant theme overriding by the integration team. Zero heavy frameworks or neon aesthetics.
* **Vanilla JavaScript (ES6+):** Pure client-side logic organized into modular functions. No external libraries or runtime dependencies.
* **JSON:** Predefined simulated dataset files for known signatures and runtime behavioral profiles.
* **Docker / Nginx (Optional Packaging):** Minimal static Nginx webserver container for deployment testing.

---

## 5. Folder Structure

```
malicious-program-detection/
│
├── index.html                   # Main experiment document (semantic single-page)
├── style.css                    # Clean, academic CSS with CSS variables & print styles
├── script.js                    # Core experiment logic, analysis engines, sandbox, & quiz
├── README.md                    # Technical documentation and deployment guide
│
├── data/
│   ├── signatures.json          # Database of simulated malware signatures
│   └── behavior-profiles.json   # Predefined simulated behavioral profiles
│
├── tests/
│   └── TEST_CASES.md            # Complete test scenarios and manual verification steps
│
├── Dockerfile                   # Nginx container configuration
├── docker-compose.yml           # Compose file for local isolated packaging
└── .dockerignore                # Container build exclusions
```

---

## 6. How to Run Locally

### Option A: Direct Browser Execution (Zero Installation)
Simply double-click `index.html` or open it in any modern web browser:
```bash
# On Windows PowerShell:
Start-Process index.html
```
*Note:* The module includes an automatic fallback dataset embedded in `script.js`. If your browser's security settings restrict `fetch()` on `file:///` URLs, the simulation automatically switches to internal fallback data with zero interruption.

### Option B: Local Static Server (Python)
If Python is available on your machine:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option C: Docker / Docker Compose
To run via a lightweight isolated Nginx container:
```bash
# Build and run using Docker Compose
docker compose up --build

# Or standard Docker commands
docker build -t vlab-malware-detection .
docker run -d -p 8080:80 --name vlab-malware-detection vlab-malware-detection
```
Access the lab at `http://localhost:8080`.

---

## 7. How the Simulation Works

```
                        +----------------------------+
                        |   Select Simulated Sample  |
                        +--------------+-------------+
                                       |
                 +---------------------+---------------------+
                 |                                           |
                 v                                           v
      +----------------------+                   +-----------------------+
      | Stage 1: Signature   |                   | Stage 2: Behavioral   |
      | Analysis             |                   | Analysis              |
      | (Static Scan)        |                   | (Dynamic Indicators)  |
      +----------+-----------+                   +-----------+-----------+
                 |                                           |
                 | MATCH / NO MATCH                          | Risk Score:
                 |                                           | LOW / MEDIUM / HIGH
                 +---------------------+---------------------+
                                       |
                                       v
                        +----------------------------+
                        | Stage 3: Combined Verdict  |
                        | (CLEAN / SUSP. / MALICIOUS)|
                        +----------------------------+
```

1. **Sample Selection:** The student chooses from four simulated binary archetypes:
   - *Sample 1: Clean Application* (benign text utility).
   - *Sample 2: Known Malicious Program* (cataloged Trojan dropper).
   - *Sample 3: Modified Malicious Program* (polymorphic ransomware / zero-day evasion variant).
   - *Sample 4: Unknown Program* (background telemetry diagnostic tool).
2. **Signature Analysis:** Queries the simulated database (`signatures.json`). If a matching signature string or hash is detected, a `MATCH` status is raised.
3. **Behavioral Analysis & Simulated Program Activity:**
   - **Simulated Program Activity:** Stepping through the execution sequence in real-time with event-by-event feedback (`[ OBSERVED ]` / `[ NOT OBSERVED ]`).
   - **Live Behavioral Risk Score:** Dynamically tracks score increments (0/5 LOW &rarr; 1/5 &rarr; 2/5 MEDIUM &rarr; ... &rarr; 5/5 HIGH) demonstrating where risk accumulates.
   - Inspects 5 runtime behavioral indicators from `behavior-profiles.json`:
     - Process Creation
     - File Modification
     - Persistence Attempt
     - Suspicious Network Activity
     - System Modification
   
   **Scoring Heuristic:**
   - 0–1 indicators = **LOW RISK**
   - 2–3 indicators = **MEDIUM RISK**
   - 4–5 indicators = **HIGH RISK**
4. **Combined Detection & Why Was This Detected?:**
   - *Signature Match + Any Risk* &rarr; **MALICIOUS**
   - *No Signature Match + High Risk* &rarr; **SUSPICIOUS** (flags polymorphic / zero-day malware)
   - *No Signature Match + Medium Risk* &rarr; **SUSPICIOUS** (flagged for sandbox review)
   - *No Signature Match + Low Risk* &rarr; **CLEAN**
   - Educational explanation section clarifies the explicit reason behind the classification (e.g. explaining why modified malware evades static signatures but gets caught by dynamic heuristics).
5. **Analyst Decision Simulation:**
   - Allows the student to act as a security analyst by triaging the collected evidence into an action (**Allow**, **Investigate Further**, or **Quarantine**).
   - Generates educational assessment explaining the operational best practice for that decision.

---

## 8. Procedure
1. Select a program sample from the **Sample Program** dropdown.
2. Review the simulated program metadata (Name, Sample ID, File Type, Simulated Hash, Simulated Signature).
3. Click **[ Run Signature Scan ]** and review the signature match status.
4. Click **[ Start Activity Simulation ]** to observe sequential execution events and live risk score increments, or **[ Run Behavioral Analysis ]** for an immediate calculation.
5. Review the **Combined Detection Result** and examine the decision rationale.
6. Read the **Why Was This Detected?** explanation to understand the detection mechanism.
7. Under **Analyst Decision**, select the recommended triage action (Allow, Investigate Further, Quarantine) and click **[ Submit Decision ]** to review feedback.
8. Verify the chronological events logged in the **Activity Log**.
9. Read the dynamically generated academic **Observation**.
10. Repeat for all 4 test samples to observe differences between static evasion and behavioral heuristics.
11. Review the comprehensive **Comparative Analysis** matrix and architectural cards contrasting Signature-Based Detection vs. Behavioral Analysis.
12. Read the **Conclusion** summarizing core defense-in-depth principles.
13. Complete the 8-question self-assessment **Quiz**.
14. Submit optional lab feedback.

---

## 9. Test Cases
Refer to [tests/TEST_CASES.md](file:///c:/Users/aksha/Downloads/malicious-program-detection/tests/TEST_CASES.md) for full test scenarios and manual verification steps:
* **TC01 - Clean Application:** No signature match + Low Risk = `CLEAN`.
* **TC02 - Known Malicious:** Signature match + High Risk = `MALICIOUS`.
* **TC03 - Modified Malicious:** No signature match + High Risk = `SUSPICIOUS` (catches evasion).
* **TC04 - Unknown Program:** No signature match + Medium Risk = `SUSPICIOUS` (heuristics triage).
* **TC05 - Reset Lab:** Completely clears all inputs, outputs, log entries, and quiz answers.
* **TC06 - Quiz:** Scores 8 questions with instant answer explanations.
* **TC07 - Activity Log:** Records all operations with chronological timestamps and clear function.
* **TC08 - Heuristic Risk Thresholds:** Verifies 0-1 (Low), 2-3 (Medium), 4-5 (High) boundaries.
* **TC09 - Simulated Program Activity:** Real-time event playback and dynamic risk score increments.
* **TC10 - Pedagogical Explanations:** Validates context-aware rationale for evasion scenarios.
* **TC11 - Analyst Decision Engine:** Evaluates student triage actions against security best practices.

---

## 10. Expected Outputs

| Sample Selected | Signature Scan | Behavioral Risk | Final Classification | Key Takeaway |
| :--- | :--- | :--- | :--- | :--- |
| **Clean App** | NO MATCH | LOW (0/5) | **CLEAN** | Normal benign software passes both stages safely. |
| **Known Malware** | MATCH (SIG-MAL-001) | HIGH (5/5) | **MALICIOUS** | Instant static detection; behavioral metrics confirm threat. |
| **Modified Malware**| NO MATCH | HIGH (4/5) | **SUSPICIOUS** | Evades static signature, but caught by behavioral monitoring. |
| **Unknown Program** | NO MATCH | MEDIUM (2/5) | **SUSPICIOUS** | Flagged for quarantine or manual administrative review. |

---

## 11. Comparison: Signature-Based vs. Behavioral Analysis

| Feature / Dimension | Signature-Based Detection | Behavioral Analysis |
| :--- | :--- | :--- |
| **Inspection Phase** | **Pre-Execution (Static):** Analyzes file structure on disk before launch. | **Runtime (Dynamic):** Evaluates live operations while program executes in memory. |
| **Primary Question** | *"Have we cataloged this exact binary pattern or hash before?"* | *"Is the program executing actions indicative of malicious intent?"* |
| **Detection Mechanism** | Cryptographic hashes (SHA-256/MD5), fixed byte sequence matching, opcode regexes. | API call monitoring, process injection, registry persistence, network egress, file encryption. |
| **Execution Requirement** | Passive inspection; zero execution needed (100% safe). | Active execution required; isolated sandbox or protected endpoint agent needed. |
| **Detection Speed** | Instantaneous (sub-millisecond hash lookup). | Slower (requires runtime event aggregation over seconds/minutes). |
| **Zero-Day Resilience** | **Fails (0%):** Any byte or hash shift evades detection. | **High:** Catches novel/polymorphic malware by unauthorized actions. |
| **Obfuscation Resistance** | **Low:** Crypters and packers easily defeat static patterns. | **High:** Payload must eventually unpack in memory to execute actions. |
| **False Positive Risk** | Near-zero for exact cryptographic hashes. | Moderate to High (legitimate admin scripts may mimic suspicious traits). |
| **Update Dependency** | Dependent on continuous signature repository updates. | Heuristic baselines allow detection without new signature releases. |
| **Defense-in-Depth Role**| **Tier 1 (Gatekeeper):** Neutralizes 90%+ known threats fast. | **Tier 2 (Proactive Defense):** Deep inspection for evasive/zero-day attacks. |

---

## 12. Quiz Details
The module includes 8 multiple-choice questions directly integrated into the page:
* Covers core concepts: virus signatures, static limitations, dynamic indicators, persistence mechanisms, polymorphic evasion, risk scoring, defense-in-depth, and telemetry analysis.
* Evaluates answers immediately with an overall score (`X / 8`) and provides educational rationales for correct and incorrect answers.
* Resettable via the `[ Reset Lab ]` button.

---

## 13. Safety and Ethical Notice
> **CRITICAL ACADEMIC SAFETY NOTICE:**
> This experiment is purely an educational simulation.
> - **NO** real malware binaries are executed or downloaded.
> - **NO** host filesystem, registry, process table, or network sockets are modified or scanned.
> - All sample hashes, signatures, and runtime events are simulated mock records stored in static JSON format.
> - Completely safe to execute in any institutional, lab, or personal browser environment.

---

## 14. Integration Instructions

This module was intentionally built as an **independent component** with **zero external frameworks** to enable seamless integration into a host Virtual Lab platform:

### Step 1: Copy Experiment Files
Copy the directory contents into your platform's experiment directory (e.g., `experiments/Exp-MalwareDetection/`):
```
experiments/Exp-MalwareDetection/
├── index.html
├── style.css
├── script.js
└── data/
    ├── signatures.json
    └── behavior-profiles.json
```

### Step 2: Embedding Options

#### Option 1: iframe Embedding (Simplest)
Load the module inside your host platform's content container:
```html
<iframe src="experiments/Exp-MalwareDetection/index.html" 
        width="100%" 
        height="1200px" 
        style="border: none;"
        title="Malicious Program Detection Lab">
</iframe>
```

#### Option 2: Inline Partial HTML Embedding
If pasting into a parent layout:
1. Extract `<main class="lab-container">...</main>` from `index.html`.
2. Link `style.css` and `script.js`.
3. Ensure relative paths to `data/signatures.json` and `data/behavior-profiles.json` remain accurate, or rely on the embedded fallback dataset in `script.js`.

### Step 3: Customizing the Color Theme
The module does not hardcode standalone colors. Override the CSS variables in `style.css` or within your parent stylesheet to match your institution's theme:
```css
:root {
  --primary-color: #003366;     /* Your university / lab primary color */
  --secondary-color: #555555;   /* Secondary accent */
  --background-color: #ffffff;  /* Background color */
  --surface-color: #f8f9fa;     /* Surface panels */
  --text-color: #212529;        /* Body text */
  --border-color: #dee2e6;      /* Borders */
}
```

---

## 14. Educational Limitations
* **Simulated Environment:** Indicators and signatures are mock representations designed for undergraduate learning. They do not simulate kernel-level drivers or hypervisor-based introspection.
* **Deterministic Scoring:** The scoring heuristic (0-1 = Low, 2-3 = Medium, 4-5 = High) is a simplified pedagogical model, whereas commercial EDRs use advanced machine learning models and dynamic Bayesian weighting.

---

## 15. References
1. NIST SP 800-83 (Rev. 1): *Guide to Malware Incident Prevention and Handling for Desktops and Laptops*.
2. William Stallings and Lawrie Brown, *Computer Security: Principles and Practice*, 4th Edition, Pearson.
3. MITRE ATT&amp;CK&reg; Knowledge Base (*Enterprise Matrix - Execution, Persistence, Evasion*).
4. Sikorski, M., &amp; Honig, A., *Practical Malware Analysis*, No Starch Press.
