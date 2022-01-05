import { Breadcrumb } from 'react-bootstrap';

export default function Banner() {
  return (
    <div id="breadcrumb">
    <Breadcrumb>
      <Breadcrumb.Item id="form-breadcrumb" href="/">Form</Breadcrumb.Item>
      <Breadcrumb.Item id="guest-breadcrumb" href="/admin/guests">Admin - Guests</Breadcrumb.Item>
      <Breadcrumb.Item id="affiliate-breadcrumb" href="/admin/affiliates">Admin - Affiliates</Breadcrumb.Item>
    </Breadcrumb>
  </div>
  );
}

