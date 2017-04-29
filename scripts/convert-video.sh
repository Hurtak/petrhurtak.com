#!/usr/bin/env bash

FROM="${1}"
TO="${2}"

ffmpeg \
  -i "${FROM}" \
  -vcodec h264 \
  -an \
  "${TO}"
