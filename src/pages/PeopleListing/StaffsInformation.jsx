
import { useFetchList } from "./UseFetchList";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";

export default function StaffsInformation() {
  const { data: staffs, loading, error } = useFetchList("/user/office-helpers/");

  return (
    <ListWrapper title="Staffs" data={staffs} loading={loading} error={error}>
      {staffs.map((staff) => (
        <PersonCard
          key={staff.account.id}
          account={staff.account}
          rightExtra={
            <>
              {staff.account.display_religion && (
                <p><b>Religion:</b> {staff.account.display_religion}</p>
              )}
              {staff.account.gender && (
                <p><b>Gender:</b> {staff.account.gender}</p>
              )}
            </>
          }
        />
      ))}
    </ListWrapper>
  );
}
