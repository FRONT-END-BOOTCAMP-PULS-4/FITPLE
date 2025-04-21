// 'use client';

// import { useFetchApplyPut } from '@/hooks/useFetchApply/userFetchApplyPut';

// export default function UpdateStatusButtons() {
//     const { updateApplyStatus, loading, error, success } = useFetchApplyPut();

//     const handleAccept = async () => {
//         await updateApplyStatus({ applyId: 1, status: 'accept' });
//     };

//     const handleReject = async () => {
//         await updateApplyStatus({ applyId: 1, status: 'reject' });
//     };

//     return (
//         <div>
//             <button onClick={handleAccept} disabled={loading}>
//                 수락
//             </button>
//             <button onClick={handleReject} disabled={loading}>
//                 거절
//             </button>

//             {error && <p style={{ color: 'red' }}>❌ {error}</p>}
//             {success && <p style={{ color: 'green' }}>✅ 상태 변경 완료</p>}
//         </div>
//     );
// }
