import json
import time
from typing import Dict, List, Union
import whisper


def transcribe():
    """
    Finds the audio file, transcribes it to JSON with timestamps for each word, and constructs
    JSON, SRT, VTT, and HTML transcripts in the format specified by the Podcast 2.0 feed.
    """
    model = whisper.load_model("small.en")
    episode_slug = input("episode slug: ")

    result = model.transcribe(episode_slug + ".m4a", word_timestamps=True)

    with open(episode_slug + "_transcribed.json", "w") as f:
        f.write(json.dumps(result))

    export_as_json(result)


def export_as_json(result: Dict[str, Union[str, List]], filename: str):
    segments = []
    buffer = ""
    start = result["segments"][0]["start"]
    end = start
    for segment in result["segments"]:
        for word in segment["words"]:
            if len((buffer + word["word"]).strip()) > 32:
                segments.append(
                    {"startTime": start, "endTime": end, "body": buffer.strip()}
                )

                # Reset for next segment
                buffer = word["word"]
                start = word["start"]
            else:
                buffer += word["word"]
                end = word["end"]

    if len(buffer.strip()) > 0:
        print(start, end, buffer)
        segments.append({"startTime": start, "endTime": end, "body": buffer.strip()})

    # see https://github.com/Podcastindex-org/podcast-namespace/blob/main/transcripts/transcripts.md
    output = {"version": "1.0.0", "segments": segments}

    with open(filename + ".json", "w") as f:
        f.write(json.dumps(output, indent=2))

    return output


def convert_seconds_to_timecode(seconds):
    ms = int((seconds - int(seconds)) * 1000)
    return time.strftime("%H:%M:%S", time.gmtime(seconds)) + f",{ms:03d}"


def export_as_srt(result: Dict[str, Union[str, List]], filename: str):
    segments = []
    buffer = ""
    start = result["segments"][0]["start"]
    end = start
    for segment in result["segments"]:
        for word in segment["words"]:
            if len((buffer + word["word"]).strip()) > 32:
                segments.append({"start": start, "end": end, "body": buffer.strip()})

                # Reset for next segment
                buffer = word["word"]
                start = word["start"]
            else:
                buffer += word["word"]
                end = word["end"]

    if len(buffer.strip()) > 0:
        print(start, end, buffer)
        segments.append({"start": start, "end": end, "body": buffer.strip()})

    # see https://github.com/Podcastindex-org/podcast-namespace/blob/main/transcripts/transcripts.md
    lines = []
    for index, segment in enumerate(segments):
        lines.append(str(index + 1))
        lines.append(
            f"{convert_seconds_to_timecode(segment['start'])} --> {convert_seconds_to_timecode(segment['end'])}"
        )
        lines.append(segment["body"])
        lines.append("")

    with open(filename + ".srt", "w") as f:
        f.write("\n".join(lines))

    return lines


if __name__ == "__main__":
    # result = transcribe()
    with open("01-missing-tombstone_transcribed.json") as f:
        result = json.loads(f.read())

    export_as_json(result, "01-missing-tombstone")
    export_as_srt(result, "01-missing-tombstone")
