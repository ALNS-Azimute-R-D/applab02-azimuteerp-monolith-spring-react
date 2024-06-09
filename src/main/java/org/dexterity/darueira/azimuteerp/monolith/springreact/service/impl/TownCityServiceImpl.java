package org.dexterity.darueira.azimuteerp.monolith.springreact.service.impl;

import java.util.Optional;
import org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TownCity;
import org.dexterity.darueira.azimuteerp.monolith.springreact.repository.TownCityRepository;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.TownCityService;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.dto.TownCityDTO;
import org.dexterity.darueira.azimuteerp.monolith.springreact.service.mapper.TownCityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link org.dexterity.darueira.azimuteerp.monolith.springreact.domain.TownCity}.
 */
@Service
@Transactional
public class TownCityServiceImpl implements TownCityService {

    private final Logger log = LoggerFactory.getLogger(TownCityServiceImpl.class);

    private final TownCityRepository townCityRepository;

    private final TownCityMapper townCityMapper;

    public TownCityServiceImpl(TownCityRepository townCityRepository, TownCityMapper townCityMapper) {
        this.townCityRepository = townCityRepository;
        this.townCityMapper = townCityMapper;
    }

    @Override
    public TownCityDTO save(TownCityDTO townCityDTO) {
        log.debug("Request to save TownCity : {}", townCityDTO);
        TownCity townCity = townCityMapper.toEntity(townCityDTO);
        townCity = townCityRepository.save(townCity);
        return townCityMapper.toDto(townCity);
    }

    @Override
    public TownCityDTO update(TownCityDTO townCityDTO) {
        log.debug("Request to update TownCity : {}", townCityDTO);
        TownCity townCity = townCityMapper.toEntity(townCityDTO);
        townCity = townCityRepository.save(townCity);
        return townCityMapper.toDto(townCity);
    }

    @Override
    public Optional<TownCityDTO> partialUpdate(TownCityDTO townCityDTO) {
        log.debug("Request to partially update TownCity : {}", townCityDTO);

        return townCityRepository
            .findById(townCityDTO.getId())
            .map(existingTownCity -> {
                townCityMapper.partialUpdate(existingTownCity, townCityDTO);

                return existingTownCity;
            })
            .map(townCityRepository::save)
            .map(townCityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TownCityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TownCities");
        return townCityRepository.findAll(pageable).map(townCityMapper::toDto);
    }

    public Page<TownCityDTO> findAllWithEagerRelationships(Pageable pageable) {
        return townCityRepository.findAllWithEagerRelationships(pageable).map(townCityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TownCityDTO> findOne(Long id) {
        log.debug("Request to get TownCity : {}", id);
        return townCityRepository.findOneWithEagerRelationships(id).map(townCityMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TownCity : {}", id);
        townCityRepository.deleteById(id);
    }
}
