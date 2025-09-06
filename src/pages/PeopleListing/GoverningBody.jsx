import { useFetchList } from "./UseFetchList";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";

export default function GoverningBody() {
  const { data: members, loading, error } = useFetchList("/user/governing/");

  return (
    <ListWrapper title="Governing Body" data={members} loading={loading} error={error}>
      {members.map((member) => (
        <PersonCard
          key={member.account?.id || member.designation}
          account={member.account}
          extra={
            <>
              <p className="font-semibold capitalize">{member.designation}</p>
              <p className="text-sm text-gray-600">{member.profession}</p>
            </>
          }
          rightExtra={
            member.account?.address && <p><b>Address:</b> {member.account.address}</p>
          }
        />
      ))}
    </ListWrapper>
  );
}
