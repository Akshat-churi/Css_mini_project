# Interactive Simulation

## 1. Simulation Architecture & Workflow

The simulation models a modern hybrid malware analysis pipeline featuring both static pre-execution inspection and dynamic runtime behavioral monitoring:

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

---

## 2. Simulated Program Archetypes

Students can select and evaluate four representative software archetypes:

1. **Sample 1: Clean Application (`TextEditor_v2.1.exe`)**
   - **Description:** Benign utility performing standard user file operations without abnormal system access.
   - **Signature:** No match in the malware signature database.
   - **Behavior:** 0 suspicious indicators.

2. **Sample 2: Known Malicious Program (`TrojanDownloader_v1.exe`)**
   - **Description:** Cataloged trojan dropper exhibiting severe malicious traits.
   - **Signature:** Matches signature ID `SIG-MAL-001` (Trojan.Downloader).
   - **Behavior:** 5 of 5 suspicious indicators active.

3. **Sample 3: Modified Malicious Program (`TrojanMorphed_v2.exe`)**
   - **Description:** Polymorphic variant or zero-day recompiled ransomware designed to evade static detection.
   - **Signature:** No match (altered hash and opcode sequence).
   - **Behavior:** 4 of 5 suspicious indicators active (process creation, file modification, persistence, network egress).

4. **Sample 4: Unknown Program (`SysMonitorHelper_x64.exe`)**
   - **Description:** Administrative diagnostic utility exhibiting ambiguous telemetry traits.
   - **Signature:** No match.
   - **Behavior:** 2 of 5 suspicious indicators active (process creation, network activity).

5. **Option 5: Custom Threat Sandbox**
   - Allows users to define custom executable metadata, upload local files to compute real client-side SHA-256 hashes safely in-memory, configure signature database hits, and toggle individual behavioral indicators.

---

## 3. Analysis Stages

### Stage 1: Signature Analysis (Static Scan)
- Inspects the sample's simulated SHA-256 hash and embedded byte signature against `data/signatures.json`.
- Yields either a **MATCH** (with signature identifier and malware classification) or **NO MATCH**.

### Stage 2: Behavioral Analysis (Dynamic Heuristics)
- Monitors 5 core runtime activity indicators from `data/behavior-profiles.json`:
  1. **Process Creation:** Spawning hidden background shells (`cmd.exe`, `powershell.exe`).
  2. **File Modification:** Rapid unauthorized file encryption and mass renaming.
  3. **Persistence Attempt:** Writing to startup registry keys or creating scheduled tasks.
  4. **Suspicious Network Activity:** Connecting to untrusted C2 IP addresses or uncommon ports.
  5. **System Modification:** Disabling firewalls or altering security policy baselines.

#### Behavioral Scoring Heuristic:
- **0–1 Indicators:** **LOW RISK** (Standard software operations)
- **2–3 Indicators:** **MEDIUM RISK** (Ambiguous or suspicious operations)
- **4–5 Indicators:** **HIGH RISK** (Critical threat behavior)

### Stage 3: Combined Detection Result (Consolidated Verdict)
Synthesizes static findings and dynamic risk scoring into an actionable verdict:

| Signature Scan | Behavioral Risk | Final Classification | Operational Rationale |
| :--- | :--- | :--- | :--- |
| **MATCH** | Any Risk Level | **MALICIOUS** | Confirmed threat cataloged in signature database. |
| **NO MATCH** | **HIGH** (4–5) | **SUSPICIOUS** | Evades static signatures, but caught by dangerous runtime behavior (e.g., zero-day / polymorphic threat). |
| **NO MATCH** | **MEDIUM** (2–3)| **SUSPICIOUS** | Ambiguous runtime traits warranting sandbox quarantine or deeper analyst inspection. |
| **NO MATCH** | **LOW** (0–1) | **CLEAN** | Benign program exhibiting standard, harmless runtime actions. |

---

## 4. Expected Outputs Summary

| Sample Selected | Signature Scan | Behavioral Risk | Final Classification | Key Takeaway |
| :--- | :--- | :--- | :--- | :--- |
| **Clean App** | NO MATCH | LOW (0/5) | **CLEAN** | Normal benign software passes both stages safely. |
| **Known Malware** | MATCH (`SIG-MAL-001`) | HIGH (5/5) | **MALICIOUS** | Instant static detection; behavioral metrics confirm threat. |
| **Modified Malware**| NO MATCH | HIGH (4/5) | **SUSPICIOUS** | Evades static signature, but caught by behavioral monitoring. |
| **Unknown Program** | NO MATCH | MEDIUM (2/5) | **SUSPICIOUS** | Flagged for quarantine or manual administrative review. |

---

## 5. Security Analyst Triage Decision Engine
Allows the student to act as an incident responder and triage the collected intelligence:
- **Allow:** Recommended for Clean applications (Low Risk + No Signature Match).
- **Investigate Further:** Recommended for Unknown/Ambiguous programs (Medium Risk) requiring manual disassembly or dynamic tracing.
- **Quarantine:** Recommended for Known Malware and Polymorphic/Evasive threats (High Risk or Confirmed Signature Match).

---

## 6. Educational Limitations
* **Simulated Environment:** Indicators and signatures are mock representations designed for undergraduate learning. They do not simulate kernel-level drivers or hypervisor-based introspection.
* **Deterministic Scoring:** The scoring heuristic (0-1 = Low, 2-3 = Medium, 4-5 = High) is a simplified pedagogical model, whereas commercial EDRs use advanced machine learning models and dynamic Bayesian weighting.
* **Safe Client-Side Execution:** No live malware is downloaded or executed; all operations run safely in the browser.
