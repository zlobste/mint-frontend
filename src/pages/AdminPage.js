import React from 'react'
import { DishManageForm } from '../components/forms/DishManageForm'
import { UserManageForm } from '../components/forms/UserManageForm'
import { InstitutionManageForm } from '../components/forms/InstitutionManageForm'

export const AdminPage = () => {
    return (
        <>
            <DishManageForm />
            <UserManageForm />
            <InstitutionManageForm />
        </>
    )
}
