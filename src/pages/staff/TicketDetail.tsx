import { useParams } from "react-router-dom";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import TicketDetailHeader from "../../components/staff/TicketDetailHeader";
import ComplaintDescriptionCard from "../../components/staff/ComplaintDescriptionCard";
import ComplaintThread from "../../components/shared/ComplaintThread";
import CommunicationLogCard from "../../components/staff/CommunicationLogCard";
import TicketActionsCard from "../../components/staff/TicketActionsCard";
import RequesterInfoCard from "../../components/staff/RequesterInfoCard";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in a real app, this would come from an API based on the ticket ID
  const ticketData = {
    id: id || "#TIC-8455",
    status: "In Progress" as const,
    title: "Lab PC #14 Component Failure",
    description:
      "The workstation in the Electrical Engineering Block (Room 204), labeled Lab PC #14, is failing to boot. Upon pressing the power button, the fans spin briefly, but there is no display output and the system emits a series of 3 short beeps. This issue is hindering scheduled lab experiments for the Power Systems course.",
    location: "EE Block, Room 204",
    reportedVia: "Student Portal (Mobile)",
    assignedStaff: {
      name: "Dr. Samuel Kebede",
    },
    priority: "HIGH" as const,
    slaDeadline: "03:42:15",
    requester: {
      name: "Abebe Bikila",
      program: "BSc. Electrical Engineering, 3rd Year",
      id: "ASTU/220/14",
      email: "abebe.b@astu.edu.et",
      phone: "+251 911 223 344",
    },
    internalNotes: [
      {
        id: "1",
        author: "Sarah Wilson",
        role: "IT ADMIN",
        timestamp: "Oct 24, 10:15 AM",
        content:
          "Checked the inventory. We have spare DDR4 RAM modules if it turns out to be a memory failure. Samuel, please verify the motherboard state before requisitioning new parts.",
        isHighlighted: true,
      },
    ],
    communicationLog: [
      {
        id: "1",
        type: "Status Updated",
        message: "Dr. Samuel Kebede changed status from Open to In Progress.",
        timestamp: "10 mins ago",
      },
      {
        id: "2",
        type: "Ticket Assigned",
        message:
          "System automatically assigned this ticket to Dr. Samuel Kebede (Lab...",
        timestamp: "1 hour ago",
      },
    ],
  };

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1600px] mx-auto">
        <TicketDetailHeader
          ticketId={ticketData.id}
          status={ticketData.status}
          title={ticketData.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ComplaintDescriptionCard
              description={ticketData.description}
              location={ticketData.location}
              reportedVia={ticketData.reportedVia}
            />
            {id && (
              <ComplaintThread
                complaintId={id}
                title="Conversation"
                placeholder="Add an update or reply for the student..."
                submitLabel="Post"
              />
            )}
            <CommunicationLogCard entries={ticketData.communicationLog} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TicketActionsCard
              status={ticketData.status}
              assignedStaff={ticketData.assignedStaff}
              priority={ticketData.priority}
              slaDeadline={ticketData.slaDeadline}
            />
            <RequesterInfoCard
              name={ticketData.requester.name}
              program={ticketData.requester.program}
              id={ticketData.requester.id}
              email={ticketData.requester.email}
              phone={ticketData.requester.phone}
            />
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default TicketDetail;
