import { useQuery, type UseQueryResult } from "./useQuery";
import { getNotifications, type Notification } from "../api/notifications";

const THIRTY_SEC_MS = 30 * 1000;

export function useNotifications(): UseQueryResult<Notification[]> {
  return useQuery("notifications:list", getNotifications, {
    ttl: THIRTY_SEC_MS,
  });
}
