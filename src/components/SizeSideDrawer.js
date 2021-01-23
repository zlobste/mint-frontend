import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export const SizeSideDrawer = ({ isOpen, onClose, dish }) => {
    const { t } = useTranslation()
    const { request } = useHttp()
    const { token } = useContext(AuthContext)

    const createOrder = async () => {
        try {
            const data = await request(
                '/api/order/edit/create',
                'POST',
                {
                    cost: Number(dish.cost),
                    datetime: new Date(),
                    dish_id: Number(dish.id),
                },
                {
                    Authorization: `Bearer ${token}`,
                },
            )
            onClose()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SideDrawer
            isOpen={isOpen}
            onClose={onClose}
            w={{ xs: '100vw', sm: '32rem' }}
        >
            <Div d='flex' m={{ b: '4rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {t('order.modal.title')}
                </Text>
            </Div>
            <Div d='flex' m={{ b: '1rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {dish.title} ${dish.cost}
                </Text>
            </Div>
            <Div d='flex' m={{ b: '1rem' }}>
                <Text p={{ l: '0.5rem', t: '0.25rem' }}>
                    {dish.description}
                </Text>
            </Div>
            <Div d='flex' justify='flex-end'>
                <Button
                    onClick={onClose}
                    bg='gray200'
                    textColor='medium'
                    m={{ r: '1rem' }}
                >
                    {t('order.modal.cancel')}
                </Button>
                <Button onClick={createOrder} bg='info700'>
                    {t('order.modal.order')}
                </Button>
            </Div>
        </SideDrawer>
    )
}
