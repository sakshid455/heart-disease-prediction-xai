# Data Leakage & Pipeline Isolation Audit Report

## 1. Audit Summary

- **Overall Audit Status:** **FAIL**
- **Leakage Detected:** YES
- **Training Partition Records:** 54,889
- **Testing Partition Records:** 13,723
- **Synthetic Generated Records:** 109,778

## 2. Core Pipeline Isolation Checks

| Check | Permissible Limit | Measured Count | Status |
|---|---|---|---|
| Test Records Used in CTGAN Training | 0 | 0 | PASS |
| Test Records in Synthetic Data | 0 | 92 | FAIL |
| Test Records in Training Set | 0 | 260 | FAIL |
| Test Contamination in Preprocessing Fit | 0 | 0 | PASS |

## 3. Diagnostic Findings & Root Cause Analysis

- LEAKAGE CRITICAL: 260 identical records found in both Train and Test partitions.
- LEAKAGE CRITICAL: 92 synthetic records exactly match test-set records.
