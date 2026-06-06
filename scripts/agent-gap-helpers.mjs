/** Shared helper for agent gap definition files. */
export function ls(phase, domain, department, file, mission, responsibilities, extra = {}) {
  return {
    file,
    phase,
    domain,
    department,
    mission,
    responsibilities,
    escalation:
      extra.escalation ||
      `Escalate cross-domain conflicts to ai-agents/master-brain/platform-orchestrator.md; production incidents to ai-agents/incident-command/incident-commander-agent.md.`,
    dependencies: extra.dependencies,
    governance: extra.governance,
    priority: extra.priority,
  };
}

export function plat(phase, domain, department, file, mission, responsibilities, extra = {}) {
  return ls(phase, domain, department, file, mission, responsibilities, extra);
}
