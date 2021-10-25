import { Breadcrumb } from 'react-bootstrap';

export default function Banner() {
  return (
    <div id="breadcrumb">
    <Breadcrumb>
      <Breadcrumb.Item href="/">Form</Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/guests">Admin - Guests</Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/affiliates">Admin - Affiliates</Breadcrumb.Item>
    </Breadcrumb>
  </div>
  );
}

