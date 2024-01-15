export default interface FormOptionsState {
  education: Array<{ id: number; name: string }> | [];
  grades: Array<{ id: number; name: string }> | [];
  countries: Array<{ id: number; name: string }> | [];
  regions: Array<{ id: number; name: string }> | [];
  cities: Array<{ id: number; name: string }> | [];
}
