# Step-by-Step Procedure

1. **Select a Sample Program:**
   Choose a program sample from the **Sample Program** dropdown menu (e.g., Clean Application, Known Malicious Program, Modified Malicious Program, or Unknown Program).

2. **Inspect Simulated Metadata:**
   Review the simulated program attributes displayed in the metadata table (Program Name, Sample ID, File Type, Simulated Hash, and Simulated Signature).

3. **Execute Signature Analysis:**
   Click **[ Run Signature Scan ]** to check the target file against the simulated malware signature database (`signatures.json`). Review the match status and analysis explanation.

4. **Execute Behavioral Analysis:**
   Click **[ Start Activity Simulation ]** to observe sequential execution events and live risk score increments in real time, or click **[ Run Behavioral Analysis ]** for an immediate calculation based on runtime indicators from `behavior-profiles.json`.

5. **Examine Combined Detection Result:**
   Review the **Combined Detection Result** section to observe how static signatures and dynamic risk scores are synthesized into a final classification (`CLEAN`, `SUSPICIOUS`, or `MALICIOUS`).

6. **Review Decision Rationale:**
   Read the **Why Was This Detected?** explanation to understand the underlying detection mechanism (e.g., why modified malware bypassed static patterns but was flagged by runtime heuristics).

7. **Perform Security Analyst Triage:**
   Under **Analyst Decision**, evaluate the gathered evidence and select the appropriate operational triage action:
   - **Allow**: Permit the program to run normally.
   - **Investigate Further**: Hold the binary for deep sandbox analysis.
   - **Quarantine**: Immediately isolate the binary and terminate running processes.
   Click **[ Submit Decision ]** to receive educational evaluation feedback.

8. **Review Activity Audit Log:**
   Inspect the chronological audit trail recorded in the **Activity Log** to verify all operational events and timestamps.

9. **Read Dynamic Observation:**
   Review the dynamically generated academic **Observation** table detailing key findings and pedagogical inferences for the tested sample.

10. **Iterate Across All Test Archetypes:**
    Repeat steps 1 through 9 for all four standard sample archetypes to contrast benign behavior, known threats, polymorphic evasion, and administrative ambiguities.

11. **Review Comparative Analysis:**
    Examine the **Comparison: Signature-Based vs. Behavioral Analysis** reference cards and matrix to solidify understanding of architectural trade-offs.

12. **Complete Self-Assessment Quiz:**
    Answer the 8-question self-assessment **Quiz** to evaluate comprehension of malware detection principles and receive instantaneous scoring and feedback.
