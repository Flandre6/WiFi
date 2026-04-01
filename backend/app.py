from flask import Flask, jsonify
from scanner.factory import get_scanner
from analyzer.risk_engine import evaluate
from ai.scorer import ai_score

app = Flask(__name__)

@app.route("/api/scan")
def scan():
    scan_wifi = get_scanner()
    nets = scan_wifi()

    results = []
    for n in nets:
        r = evaluate(n)
        r["ai_score"] = ai_score(r)
        results.append(r)

    return jsonify(results)

def start():
    app.run(port=5000)

if __name__ == "__main__":
    start()
