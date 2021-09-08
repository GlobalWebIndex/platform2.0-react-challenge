export default class LocationUtility {
  /**
   * const location = useLocation()
   *
   * provide the `location.search`
   * @param search
   * @returns
   */
  static useQuery(search: any) {
    return new URLSearchParams(search)
  }
}
