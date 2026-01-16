import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";

dayjs.extend(dayjsUtc);

// eslint-disable-next-line unicorn/prefer-export-from -- we extend dayjs before exporting
export default dayjs;