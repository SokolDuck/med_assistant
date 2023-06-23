

import pathlib
import yaml

BASE_DIR = pathlib.Path(__file__).parent.parent
config_path = BASE_DIR / 'config' / 'backend.yaml'

def get_config(path=None):
    with open(path or config_path) as f:
        config = yaml.safe_load(f)
    return config


config = get_config(config_path)
