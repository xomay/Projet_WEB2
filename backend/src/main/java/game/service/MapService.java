package game.service;

import game.controller.dto.MapDTO;
import game.model.Map;
import game.service.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class MapService {
    @Autowired
    private MapRepository mapRepository;

    public Iterable<Map> findAllMaps() {
        return mapRepository.findAll();
    }

    public Optional<Map> findMap(Long id) {
        return mapRepository.findById(id);
    }

    public boolean removeMap(Long id) {
        try {
            mapRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Map addMapDTO(MapDTO map) {
        Map newMap = new Map();
        newMap.setName(map.name());
        newMap.setTiles(map.tiles());
        return mapRepository.save(newMap);
    }
}