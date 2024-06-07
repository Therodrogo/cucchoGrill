import React from 'react';
import NavbarSuperior from '../NavbarSuperior';
import NavbarInferior from '../NavbarInferior';
import AdminProduct from '../components/AdminProduct';

const AdminProductPage = () => {
    return (
        <div>
            <NavbarSuperior />
            <AdminProduct />
            <NavbarInferior />
        </div>
    );
};

export default AdminProductPage;