from scaffold_engine import ScaffoldEngine

def generate(module_type, name):
    engine = ScaffoldEngine()

    if module_type == "api":
        return engine.create_api(name)

    elif module_type == "service":
        return engine.create_service(name)

    return {"error": "unknown type"}

print(generate("api", "test_module"))
