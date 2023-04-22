import json
import timeit
import whisper
import time

model = whisper.load_model("small.en")
episode_slug = input("episode slug: ")

def transcribe(slug: str):
    result = model.transcribe(episode_slug + ".m4a")

    segments = []
    for segment in result["segments"]:
        segments.append({
            "startTime": segment["start"],
            "endTime": segment["end"],
            "body": segment["text"].strip()
        })

    # see https://github.com/Podcastindex-org/podcast-namespace/blob/main/transcripts/transcripts.md
    output = {
        "version": "1.0.0",
        "segments": segments
    }

    with open(episode_slug + ".json", "w") as f:
        f.write(json.dumps(output))
    
    return output

timeit.timeit("transcribe(episode_slug)", number=1)