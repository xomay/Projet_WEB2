package game.service;

import game.controller.dto.MapDTO;
import game.model.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MapServiceTest {
    @Mock
    private MapRepository mapRepository;

    @InjectMocks
    private MapService mapService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllMaps() {
        Map map1 = new Map();
        Map map2 = new Map();
        when(mapRepository.findAll()).thenReturn(Arrays.asList(map1, map2));
        Iterable<Map> result = mapService.findAllMaps();
        assertNotNull(result);
        assertTrue(result.iterator().hasNext());
    }

    @Test
    void testFindMap() {
        Map map = new Map();
        map.setName("test");
        when(mapRepository.findById(1L)).thenReturn(Optional.of(map));
        Optional<Map> result = mapService.findMap(1L);
        assertTrue(result.isPresent());
        assertEquals("test", result.get().getName());
    }

    @Test
    void testRemoveMapSuccess() {
        doNothing().when(mapRepository).deleteById(1L);
        assertTrue(mapService.removeMap(1L));
    }

    @Test
    void testRemoveMapFailure() {
        doThrow(new RuntimeException()).when(mapRepository).deleteById(2L);
        assertFalse(mapService.removeMap(2L));
    }

    @Test
    void testAddMapDTO() {
        MapDTO dto = new MapDTO("map1", "plain,tree");
        Map savedMap = new Map();
        savedMap.setName("map1");
        savedMap.setTiles("plain,tree");
        when(mapRepository.save(any(Map.class))).thenReturn(savedMap);
        Map result = mapService.addMapDTO(dto);
        assertEquals("map1", result.getName());
        assertEquals("plain,tree", result.getTiles());
    }
}

