import { trackRequest, trackError } from "./gi-metrics/traffic";

app.use((req, res, next) => {
  trackRequest();
  next();
});

app.use((err, req, res, next) => {
  trackError();
  next(err);
});
