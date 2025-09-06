import { useFetchList } from "./UseFetchList";
import ListWrapper from "../../components/Common/ListWrapper";
import PersonCard from "../../components/Common/PersonCard";

export default function TeacherInformation() {
  const { data: teachers, loading, error } = useFetchList("/user/teachers/");

  return (
    <ListWrapper title="Teachers" data={teachers} loading={loading} error={error}>
      {teachers.map((teacher) => (
        <PersonCard
          key={teacher.account.id}
          account={teacher.account}
          rightExtra={
            <>
              {teacher.account.display_religion && (
                <p><b>Religion:</b> {teacher.account.display_religion}</p>
              )}
              {teacher.base_subject_detail && (
                <p><b>Subject:</b> {teacher.base_subject_detail.name}</p>
              )}
            </>
          }
        />
      ))}
    </ListWrapper>
  );
}
