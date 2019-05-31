#!/usr/bin/env python3
import jinja2
import sys
import os
import re

TEMPLATE = "template.html"
SCRIPTS_DIR = "../src"

METADATA_RE = re.compile(r"(?m)^\/\/ @([a-z]+) *(.*)$")

def parse_metadata(file):
    content = open(file).read()
    metadata = {}
    for match in METADATA_RE.finditer(content):
        metadata[match.group(1)] = match.group(2)
    return metadata

def generate():
    scripts = []
    for file in os.listdir(SCRIPTS_DIR):
        path = os.path.join(SCRIPTS_DIR, file)
        if os.path.isfile(path) and file.endswith(".user.js"):
            scripts.append({
                "file": file,
                "metadata": parse_metadata(path),
            })
    scripts = sorted(scripts, key=lambda s: s["file"])

    tmpl = jinja2.Template(open(TEMPLATE).read())
    return tmpl.render(**{
        "scripts": scripts,
    })

if __name__ == "__main__":
    print(generate())
