import React from 'react'
import { ManageDishesForm } from '../components/ManageDishesForm'
import { ManageUsersForm } from '../components/ManageUsersForm'
import { ManageInstitutionsForm } from '../components/ManageInstitutionsForm'

export const AdminPage = () => {
    return (
        <>
            <ManageDishesForm />
            <ManageUsersForm />
            <ManageInstitutionsForm />
        </>
    )
}
