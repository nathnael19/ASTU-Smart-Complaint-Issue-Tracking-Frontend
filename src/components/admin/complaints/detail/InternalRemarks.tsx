import ComplaintThread from "../../../shared/ComplaintThread";

interface InternalRemarksProps {
  complaintId: string;
}

const InternalRemarks = ({ complaintId }: InternalRemarksProps) => {
  return (
    <ComplaintThread
      complaintId={complaintId}
      title="Conversation"
      placeholder="Type an update or reply for the student and team..."
      submitLabel="Post"
    />
  );
};

export default InternalRemarks;
