import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Đã có lỗi xảy ra!</h1>
      <p>Rất tiếc, ứng dụng đã gặp sự cố không mong muốn.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => window.location.reload()}>Tải lại trang</button>
    </div>
  );
}