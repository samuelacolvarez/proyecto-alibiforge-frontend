import { specialityLabel } from "../utils/constants";

export default function SpecialityBadge({ speciality }) {
  if (!speciality) return null;
  return <span className="badge badge-speciality">{specialityLabel(speciality)}</span>;
}
