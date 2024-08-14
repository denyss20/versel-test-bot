import "./info-row.css";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="info-row">
    <span className="info-row-icon">{icon}</span>

    <div className="info-row-right-block">
      <span className="info-row-label">{label}</span>
      <span className="info-row-value">{value}</span>
    </div>
  </div>
);

export default InfoRow;
