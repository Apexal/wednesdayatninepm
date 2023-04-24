import json
import timeit
import whisper
import time

model = whisper.load_model("small.en")
episode_slug = input("episode slug: ")


def transcribe(slug: str):
    result = model.transcribe(episode_slug + ".m4a", word_timestamps=True)

    segments = []
    for segment in result["segments"]:
        for word in segment["words"]:
            segments.append(
                {
                    "startTime": word["start"],
                    "endTime": word["end"],
                    "body": word["word"].strip(),
                }
            )

    # see https://github.com/Podcastindex-org/podcast-namespace/blob/main/transcripts/transcripts.md
    output = {"version": "1.0.0", "segments": segments}

    with open(episode_slug + ".json", "w") as f:
        f.write(json.dumps(output))

    return output


transcribe(episode_slug)
