function generateModule(type) {
  const modules = {
    api: {
      name: "API MODULE",
      status: "generated",
      endpoints: ["/init", "/execute", "/status"]
    },

    simulator: {
      name: "FAILURE SIMULATOR",
      status: "active",
      modes: ["stress", "cascade", "recovery"]
    },

    default: {
      name: "GENERIC MODULE",
      status: "created"
    }
  };

  return modules[type] || modules.default;
}
