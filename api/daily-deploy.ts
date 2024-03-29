export default async function handler(req, res) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return res.status(401).end("Unauthorized");

  await fetch(process.env.DEPLOY_HOOK_URL);

  res.status(200).end("Daily deploy success!");
}
