import { Modal, Stack, Text } from "@mantine/core";
import PropTypes from "prop-types";

const SubscriberModal = ({ opened, onClose, subscriber }) => {
    return (
        <Modal
        opened={opened}
        onClose={onClose}
        title="Subscriber Details"
        size="md"
        radius="md"
        centered
        styles={{
            title: {
                paddingTop: '1.5rem',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#000'
            },
            body: {
                paddingLeft: '2.5rem',
                paddingTop: '0.5rem'

            }
        }}
        >
            {subscriber && (
                <Stack >
                    <Text size="lg">
                        <Text span fw={600}>Phone number:</Text> {subscriber.msidn}
                    </Text>
                    <Text size="lg">
                        <Text span fw={600}>Name:</Text> {subscriber.firstName} {subscriber.lastName}
                    </Text>
                    <Text size="lg">
                        <Text span fw={600}>Tier:</Text> {subscriber.tier}
                    </Text>
                    <Text size="lg">
                        <Text span fw={600}>Points:</Text> {subscriber.points}
                    </Text>
                </Stack>
            )}
        </Modal>
    );
};

SubscriberModal.propTypes = {
    opened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    subscriber: PropTypes.shape({
        msidn: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        tier: PropTypes.string.isRequired,
        points: PropTypes.string.isRequired,
    }),
};

export default SubscriberModal;