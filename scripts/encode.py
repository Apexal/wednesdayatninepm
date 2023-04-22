from subprocess import call

message = input("message: ")
encoded = ". ".join([str(ord(c)) for c in message]) + "."

with open("code.wav", "w") as f:
    call(["espeak", "-s140 -ven+18 -z", encoded, "--stdout"], stdout=f)
