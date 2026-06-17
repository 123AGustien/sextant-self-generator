# Sextant System Specification (v1.0)

## 1. Overview

Sextant is a cascade-based simulation engine designed to model systemic risk propagation across interconnected scenarios.

It simulates how shocks propagate through financial, geopolitical, and macroeconomic systems, and how interventions can interrupt or stabilize those cascades.

---

## 2. Core Purpose

- Model multi-step cascade events (risk propagation chains)
- Provide scenario-based simulation environments
- Test intervention mechanisms under stress conditions
- Visualize system risk evolution over time

---

## 3. System Architecture

The system is structured into 6 core layers:

### 3.1 Navigation Layer
- Entry point for module selection
- Routes user to simulator, generator, or console views

### 3.2 Scenario Engine
- Defines predefined stress scenarios:
  - Trade Shock
  - Geopolitical Crisis
  - Energy Shock
  - Recession Scenario
- Each scenario contains:
  - Name
  - Path (sequence of events)
  - Base risk value

### 3.3 Cascade Engine
- Executes scenario step-by-step
- Each step represents a propagation event
- Increases system risk per step
- Advances system state sequentially

### 3.4 Intervention Engine
- Allows system interruption or modification
- Supported interventions:
  - Liquidity Buffer
  - Central Bank Injection
  - Communication Stabilization
- Each intervention modifies cascade progression or risk output

### 3.5 Risk Engine
- Computes system-wide risk score
- Risk increases with cascade depth
- Risk decreases when interventions are active
- Risk defines system state classification:
  - STABLE
  - MODERATE
  - HIGH
  - CRITICAL

### 3.6 Timeline Logger
- Records every system event
- Logs:
  - Timestamp
  - Event type
  - Event data
- Provides full audit trail of simulation execution

---

## 4. Execution Model

Simulation flow:

1. Scenario selected
2. Cascade engine starts execution
3. System steps through scenario path
4. Risk updates per step
5. Intervention may interrupt or modify progression
6. Timeline logs all events
7. Final system state is rendered

---

## 5. State Machine Rules

- System state must be deterministic per scenario run
- Each step executes sequentially (no parallel skipping)
- Risk must always update after each step
- Intervention can:
  - Interrupt cascade
  - Reduce risk
  - Stabilize system state
- Timeline logging must capture every state change

---

## 6. Repository Structure



https://github.com/123AGustien/sextant-self-generator/blob/main/docs/system-spec.md
