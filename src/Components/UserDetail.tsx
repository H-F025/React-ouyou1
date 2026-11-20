import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../Types/user';

function UserDetail() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('詳細取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (loading) return <p>読み込み中...</p>;
  if (!user) return <p>ユーザーが見つかりません。</p>;

  return (
    <div>
      <h1 className="title">ユーザーページ</h1>
      <div className="detail-card">
        <div className="detail-info">
          <p className="detail-text">name : {user.name}</p>
          <p className="detail-text">email : {user.email}</p>
          <p className="detail-text">Phone : {user.phone}</p>
          <div className="detail-address">
            <p className="detail-text">Address</p>
            <p className="detail-text">street : {user.address.street}</p>
            <p className="detail-text">suite : {user.address.suite}</p>
            <p className="detail-text">city : {user.address.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
