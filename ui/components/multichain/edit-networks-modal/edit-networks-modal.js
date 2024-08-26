import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextVariant } from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getNonTestNetworks, getPermittedChainsByOrigin, getTestNetworks } from '../../../selectors';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Checkbox,
  Text,
  Box,
} from '../../component-library';
import { NetworkListItem } from '..';

export const EditNetworksModal = ({ onClose }) => {
  const t = useI18nContext();
  const nonTestNetworks = useSelector(getNonTestNetworks);
  const testNetworks = useSelector(getTestNetworks);
  const chains = useSelector(getPermittedChainsByOrigin);
  const permittedChains = Object.values(chains);
  const flattenedPermittedChains = permittedChains.flat();
  const [selectedChains, setSelectedChains] = useState(
    flattenedPermittedChains,
  );
  console.log(chains, selectedChains);
  const handleAccountClick = (chainId) => {
    const index = selectedChains.indexOf(chainId);
    let newSelectedChains = [];

    if (index === -1) {
      // If chainId is not already selected, add it to the selectedChains array
      newSelectedChains = [...selectedChains, chainId];
    } else {
      // If chainId is already selected, remove it from the selectedChains array
      newSelectedChains = selectedChains.filter(
        (_item, idx) => idx !== index,
      );
    }
    console.log(newSelectedChains, 'ggg');
    setSelectedChains(newSelectedChains);
  };
  return (
    <Modal
      isOpen
      onClose={() => {
        onClose();
      }}
      className="edit-networks-modal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          onClose={() => {
            onClose();
          }}
        >
          {t('editNetworksTitle')}
        </ModalHeader>
        <Box padding={4}>
          <Checkbox
            label={t('selectAll')}
            isChecked
            gap={4}
            // onClick={() => (allAreSelected() ? deselectAll() : selectAll())}
            // isIndeterminate={isIndeterminate}
          />
        </Box>
        {nonTestNetworks.map((network) => (
          <NetworkListItem
            name={network.nickname}
            iconSrc={network?.rpcPrefs?.imageUrl}
            key={network.id}
            onClick={() => {
              handleAccountClick(network.chainId);
            }}
            startAccessory={
              <Checkbox isChecked={selectedChains.includes(network.chainId)} />
            }
          />
        ))}
        <Box padding={4}>
          <Text variant={TextVariant.bodyMdMedium}>{t('testnets')}</Text>
        </Box>
        {testNetworks.map((network) => (
          <NetworkListItem
            name={network.nickname}
            iconSrc={network?.rpcPrefs?.imageUrl}
            key={network.id}
            onClick={() => {
              handleAccountClick(network.chainId);
            }}
            startAccessory={
              <Checkbox isChecked={selectedChains.includes(network.chainId)} />
            }
            showEndAccessory={false}
          />
        ))}
      </ModalContent>
    </Modal>
  );
};

EditNetworksModal.propTypes = {
  /**
   * Executes when the modal closes
   */
  onClose: PropTypes.func.isRequired,
};
