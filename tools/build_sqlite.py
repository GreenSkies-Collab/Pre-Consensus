"""Load dataset/*.csv into SQLite under dataset/schema.sql.

Doubles as the dataset's integrity check: primary keys, foreign keys and CHECK
constraints are all enforced, and the script exits non-zero on the first
violation. CI runs it on every push.

usage:  python tools/build_sqlite.py [out.sqlite]     (default build/pre-consensus.sqlite)
Standard library only.
"""
import csv
import os
import sqlite3
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET = os.path.join(ROOT, "dataset")
# parents before children, so foreign keys resolve as rows arrive
TABLES = ["regions", "hubs", "themes", "backers", "ventures", "positions", "rounds"]


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "build", "pre-consensus.sqlite")
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    if os.path.exists(out):
        os.remove(out)

    db = sqlite3.connect(out)
    db.executescript(open(os.path.join(DATASET, "schema.sql"), encoding="utf-8").read())

    for table in TABLES:
        with open(os.path.join(DATASET, f"{table}.csv"), encoding="utf-8", newline="") as f:
            reader = csv.reader(f)
            cols = next(reader)
            sql = f'INSERT INTO {table} ({",".join(chr(34) + c + chr(34) for c in cols)}) VALUES ({",".join("?" * len(cols))})'
            n = 0
            for line, row in enumerate(reader, start=2):
                try:
                    db.execute(sql, [None if v == "" else v for v in row])
                except sqlite3.IntegrityError as e:
                    sys.exit(f"dataset/{table}.csv line {line}: {e}\n  {row[:4]}")
                n += 1
        print(f"  {table:10} {n:4} rows")

    db.commit()
    db.execute("VACUUM")
    db.close()
    print(f"Built {os.path.relpath(out, ROOT)} ({os.path.getsize(out) // 1024} KB) - all keys and constraints hold")


if __name__ == "__main__":
    main()
