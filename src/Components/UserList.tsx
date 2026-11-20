import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../Types/user';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('データ取得エラー:', err);
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="title">ユーザー一覧</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="名前で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid-container">
        {filteredUsers.map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            style={{ textDecoration: 'none' }}
          >
            <div className="card">
              <div className="card-image"></div>
              <div className="card-info">
                <p className="card-name">{user.name}</p>
                <p className="card-post">{user.company.name}</p>
                <p className="card-email">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};