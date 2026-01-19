# Index & Validation (Daily Commands)

Rebuild everything (indexes + full validation gate):

```bash
python3 scripts/index/rebuild_all_indexes.py
```

Fast validations:

```bash
python3 scripts/validate/validate_taxonomy_keys.py
python3 scripts/validate/validate_blends_registry_consistency.py
python3 scripts/validate/validate_entities_index.py
```
