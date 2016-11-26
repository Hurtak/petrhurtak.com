cd "$(dirname "$0")/.."

netlify deploy --site-id actor-minuses-63675 --path dist
rm .netlify
