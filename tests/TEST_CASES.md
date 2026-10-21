# Test Cases: Malicious Program Detection Virtual Lab Module

This test specification covers all verification criteria for the **Malicious Program Detection using Virus Signature and Behavioral Analysis** experiment module.

---

## Summary Matrix

| Test ID | Test Scenario | Input / Action | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Clean Application Verification | Select "Sample 1: Clean Application", run Signature Scan, run Behavioral Analysis | No signature match, 0/5 behavioral indicators (Low Risk), Final Verdict: **CLEAN** | PASS |
| **TC02** | Known Malicious Program Verification | Select "Sample 2: Known Malicious Program", run Signature Scan, run Behavioral Analysis | Signature Match (SIG-MAL-001), 5/5 behavioral indicators (High Risk), Final Verdict: **MALICIOUS** | PASS |
| **TC03** | Modified Malicious Program (Evasion) | Select "Sample 3: Modified Malicious Program", run Signature Scan, run Behavioral Analysis | No signature match (hash morphed), 4/5 behavioral indicators (High Risk), Final Verdict: **SUSPICIOUS** | PASS |
| **TC04** | Unknown Utility Program Analysis | Select "Sample 4: Unknown Program", run Signature Scan, run Behavioral Analysis | No signature match, 2/5 behavioral indicators (Medium Risk), Final Verdict: **SUSPICIOUS** | PASS |
| **TC05** | Complete Lab Reset Operation | Click "[ Reset Lab ]" button | Sample selection cleared, metadata hidden, scan tables hidden, checklist reset to '?', log cleared, quiz answers unchecked, score banner hidden | PASS |
| **TC06** | Self-Assessment Quiz Scoring | Answer all 8 questions and click "[ Submit Quiz ]" | Immediate evaluation showing score `X / 8`, question-by-question feedback with explanation text | PASS |
| **TC07** | Activity Audit Log Recording | Perform actions (select sample, run scans, clear, reset) | All operations appended with timestamp `[HH:MM:SS]` in chronological order; "[ Clear Log ]" empties buffer | PASS |
| **TC08** | Responsive Layout & Accessibility | Resize viewport to mobile (375px), tablet (768px), and desktop (>1024px) | No horizontal scrolling or layout breakages; all buttons and form controls accessible via keyboard | PASS |
| **TC09** | Simulated Program Activity & Live Risk Score | Click "[ Start Activity Simulation ]" on Sample 3 | Sequential display of 5 events with short delays; Live Behavioral Risk increments step-by-step from 0/5 to 4/5 (HIGH); all actions logged | PASS |
| **TC10** | "Why Was This Detected?" Educational Explanation | Run analysis on Modified Malicious Program | Explains why signature scan missed the sample (code modified) and how behavioral analysis detected multiple suspicious indicators | PASS |
| **TC11** | Analyst Decision & Educational Assessment | Select action (Allow, Investigate, Quarantine) and click "[ Submit Decision ]" | Assesses student decision against evidence (e.g. Quarantine recommended for Malicious, Investigate for Suspicious, Allow for Clean) | PASS |
| **TC12** | Practical Report & Simulation Progress Display | Analyze 1 sample (25%), enter student info, and click "[ Generate Formal Lab Report ]" | Displays simulation percentage (25%), 1/4 completed, per-sample status ('Completed' / 'Pending Run'), and quiz score | PASS |

---

## Detailed Test Procedures

### TC01: Clean Application
* **Description:** Verify benign utility software detection workflow.
* **Pre-conditions:** Page loaded; lab in initial/reset state.
* **Steps:**
  1. Open the "Select Sample Program to Analyze" dropdown.
  2. Select `Sample 1: Clean Application (TextEditor_v2.1.exe)`.
  3. Verify metadata shows Sample ID `CLEAN-001` and Signature `None`.
  4. Click `[ Run Signature Scan ]`.
  5. Click `[ Run Behavioral Analysis ]`.
* **Expected Outcome:**
  - Signature Scan Status: `NO MATCH` (Status badge green).
  - Behavioral Indicators: 0 of 5 triggered (all marked with ✗ in green).
  - Risk Level: `LOW RISK`.
  - Combined Classification: `CLEAN`.
  - Dynamic Observation reports standard utility behavior and agreement between static and dynamic analysis.

---

### TC02: Known Malicious Program
* **Description:** Verify static signature match and high behavioral risk.
* **Pre-conditions:** Page loaded.
* **Steps:**
  1. Select `Sample 2: Known Malicious Program (TrojanDownloader_v1.exe)`.
  2. Verify metadata displays Sample ID `MAL-001` and Signature `SIG-MAL-001`.
  3. Click `[ Run Signature Scan ]`.
  4. Click `[ Run Behavioral Analysis ]`.
* **Expected Outcome:**
  - Signature Scan Status: `MATCH` with ID `SIG-MAL-001` (Status badge red).
  - Behavioral Indicators: 5 of 5 triggered (Process creation, File modification, Persistence attempt, Network activity, System modification).
  - Risk Level: `HIGH RISK`.
  - Combined Classification: `MALICIOUS`.
  - Activity log flags critical threat confirmation in red.

---

### TC03: Modified Malicious Program (Polymorphic / Zero-Day Evasion)
* **Description:** Verify that signature scanning alone fails on modified threats, but behavioral analysis detects the anomaly.
* **Pre-conditions:** Page loaded.
* **Steps:**
  1. Select `Sample 3: Modified Malicious Program (TrojanMorphed_v2.exe)`.
  2. Verify metadata shows Sample ID `MAL-MOD-001` and Signature `None`.
  3. Click `[ Run Signature Scan ]`.
  4. Click `[ Run Behavioral Analysis ]`.
* **Expected Outcome:**
  - Signature Scan Status: `NO MATCH` (evaded static signature filter).
  - Behavioral Indicators: 4 of 5 triggered (High Risk).
  - Combined Classification: `SUSPICIOUS`.
  - Observation explicitly instructs student on why behavioral heuristics are vital when attackers modify file hashes.

---

### TC04: Unknown Program Analysis
* **Description:** Verify medium risk threshold handling on uncataloged software.
* **Pre-conditions:** Page loaded.
* **Steps:**
  1. Select `Sample 4: Unknown Program (SysMonitorHelper_x64.exe)`.
  2. Click `[ Run Signature Scan ]` and `[ Run Behavioral Analysis ]`.
* **Expected Outcome:**
  - Signature Scan Status: `NO MATCH`.
  - Behavioral Indicators: 2 of 5 triggered (Process creation + Telemetry egress).
  - Risk Level: `MEDIUM RISK`.
  - Combined Classification: `SUSPICIOUS` (flagged for sandbox observation).

---

### TC05: Reset Lab
* **Description:** Verify complete state reset without page refresh.
* **Steps:**
  1. Run any analysis scenario (e.g., TC02) and answer sample quiz questions.
  2. Click `[ Reset Lab ]`.
* **Expected Outcome:**
  - Dropdown resets to default empty selection.
  - Metadata panel hides.
  - Scan buttons disable.
  - Signature & Behavioral results clear.
  - Live Risk panel resets to `Risk Score: 0 / 5` and `LOW`.
  - Activity Event Card hides.
  - "Why Was This Detected?" text resets.
  - Analyst Decision panel resets and submit button is disabled.
  - Activity log is cleared and reset with initialization message.
  - Quiz radio buttons are cleared, score banner hidden, feedback hidden.

---

### TC06: Self-Assessment Quiz
* **Description:** Verify quiz validation and score calculation.
* **Steps:**
  1. Scroll to section 9 "Self-Assessment Quiz".
  2. Without selecting options, click `[ Submit Quiz ]` -> All questions mark as unanswered with explanations.
  3. Select correct options for all 8 questions and click `[ Submit Quiz ]`.
* **Expected Outcome:**
  - Score displays `8 / 8`.
  - All feedback boxes turn green with "Correct!" and explanation.
  - Activity log logs quiz completion score.

---

### TC07: Activity Audit Log Recording
* **Description:** Verify real-time timestamped audit log.
* **Steps:**
  1. Perform sample selection, activity simulation, and scans.
  2. Inspect the `#terminal-log` container.
  3. Click `[ Clear Log ]`.
* **Expected Outcome:**
  - Entries follow `[HH:MM:SS] Message` format.
  - Color-coded text for matches (red), non-matches (green), and info (blue/grey).
  - Clear Log removes prior entries and logs `[HH:MM:SS] Activity log cleared by user.`

---

### TC08: Responsive UI & Accessibility
* **Description:** Verify accessibility standards and responsiveness across viewports.
* **Steps:**
  1. Test on Desktop (>1024px), Tablet (768px), and Mobile (375px).
  2. Verify keyboard navigation with Tab and Enter keys.
* **Expected Outcome:**
  - Layout reflows cleanly without horizontal overflow.
  - All form controls have associated labels.
  - Contrast ratios meet WCAG AA standards.

---

### TC09: Simulated Program Activity & Live Risk Score
* **Description:** Verify step-by-step runtime event playback and dynamic risk score increments.
* **Steps:**
  1. Select `Sample 3: Modified Malicious Program (TrojanMorphed_v2.exe)`.
  2. Click `[ Start Activity Simulation ]`.
  3. Observe the activity event card and Live Behavioral Risk display.
* **Expected Outcome:**
  - Live Risk starts at `Risk Score: 0 / 5 (LOW)`.
  - Each indicator appears sequentially with a ~800ms delay.
  - Active behaviors display `[ OBSERVED ]` (badge-malicious); inactive display `[ NOT OBSERVED ]` (badge-clean).
  - Score updates dynamically: 1/5 (LOW) &rarr; 2/5 (MEDIUM) &rarr; 3/5 (MEDIUM) &rarr; 4/5 (HIGH).
  - Activity log logs each observed event and score update.
  - Event card marks `[ COMPLETED ]` at the end.

---

### TC10: "Why Was This Detected?" Educational Explanation
* **Description:** Verify context-specific pedagogical explanation for each sample.
* **Steps:**
  1. Perform both scans on each of the 4 samples.
  2. Check the text inside `#why-detected-box`.
* **Expected Outcome:**
  - **Sample 1:** Explains clean status (no signature match and benign runtime behavior).
  - **Sample 2:** Explains match with known malware signature and aggressive behavior.
  - **Sample 3:** Specifically explains that signature missed due to code morphing, but behavioral analysis detected multiple suspicious activities.
  - **Sample 4:** Explains that without a known signature, behavioral evidence guides further inspection.

---

### TC11: Analyst Decision & Educational Assessment
* **Description:** Verify interactive triage decision and educational feedback.
* **Steps:**
  1. After completing scans for a sample, scroll to "Analyst Decision".
  2. Review the summary of evidence in the table.
  3. Select an action (`Allow`, `Investigate Further`, `Quarantine`) and click `[ Submit Decision ]`.
* **Expected Outcome:**
  - Recommended actions:
    - `MALICIOUS` sample &rarr; Recommended: `Quarantine`.
    - `SUSPICIOUS` sample &rarr; Recommended: `Investigate Further`.
    - `CLEAN` sample &rarr; Recommended: `Allow`.
  - Displays educational assessment explaining whether the selected action is appropriate, inappropriate, or partially appropriate.
  - Action is logged in the activity audit log.

---

### TC12: Practical Report & Simulation Progress Display
* **Description:** Verify that the generated formal practical evaluation report accurately calculates and displays the percentage of simulation performed, per-sample execution status, and student credentials.
* **Steps:**
  1. Complete analysis on 1 sample (e.g. `Sample 1`).
  2. Verify that the simulation progress bar displays `25%` (1 of 4 Samples Completed).
  3. Scroll down to Section 11: `Laboratory Practical Report & Completion Record`.
  4. Fill in Student Name, Roll Number, and Institution.
  5. Click `[ Generate Formal Lab Report ]`.
* **Expected Outcome:**
  - Report modal opens and renders student metadata.
  - Displays `Simulation Performed: 25% (1 of 4 Samples Completed)` in the metadata grid.
  - Highlights `Simulation Performed: 25% (1 / 4 Samples Completed)` in the summary metrics banner.
  - Table of Analyzed Threat Samples marks `Sample 1` as `Completed` and remaining unanalyzed samples as `Pending Run`.
  - Resetting the lab resets the report simulation percentage to `0%`.

