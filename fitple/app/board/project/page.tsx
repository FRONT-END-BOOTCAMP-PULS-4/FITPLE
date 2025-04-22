// 'use client';

// import { useFetchApplyPost } from '@/hooks/useFetchApply/useFetchApplyPost';
// import { useState } from 'react';
// export default function ApplyForm() {
//     const { createApply, loading, error, success } = useFetchApplyPost();

//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); // 페이지 리로딩 방지

//         await createApply({
//             userId: 'fbb321b6-2dab-4aa9-8c02-290e6c7fb0b3',
//             projectId: 1,
//             message,
//             status: 'waiting',
//         });

//         setMessage(''); // 폼 초기화
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 메시지:
//                 <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} cols={40} />
//             </label>
//             <br />
//             <button type="submit" disabled={loading}>
//                 {loading ? '전송 중...' : '지원하기'}
//             </button>

//             {error && <p style={{ color: 'red' }}>❌ {error}</p>}
//             {success && <p style={{ color: 'green' }}>✅ 지원 완료!</p>}
//         </form>
//     );
// }
